import os
import time
import logging
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError, DisconnectionError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logger = logging.getLogger(__name__)

# Example structure for Neon DB connection
SQLALCHEMY_DATABASE_URL = os.getenv("NEON_DATABASE_URL", "sqlite:///./sql_app.db")

def create_database_engine_with_retries(max_retries=3, delay=1):
    """Create database engine with retry logic for connection issues"""
    for attempt in range(max_retries):
        try:
            engine = create_engine(
                SQLALCHEMY_DATABASE_URL,
                pool_pre_ping=True,  # Enable connection health checks
                pool_recycle=300,    # Recycle connections after 5 minutes
                connect_args={"sslmode": "require"} if "neon.tech" in SQLALCHEMY_DATABASE_URL else {}
            )
            # Test the connection
            with engine.connect() as conn:
                from sqlalchemy import text
                conn.execute(text("SELECT 1"))
            logger.info(f"Database connection established on attempt {attempt + 1}")
            return engine
        except (OperationalError, DisconnectionError) as e:
            logger.warning(f"Database connection attempt {attempt + 1} failed: {str(e)}")
            if attempt < max_retries - 1:
                logger.info(f"Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                logger.error(f"Failed to establish database connection after {max_retries} attempts")
                raise
        except Exception as e:
            logger.error(f"Unexpected error creating database engine: {str(e)}")
            raise

# Create engine with retry logic
try:
    engine = create_database_engine_with_retries()
except Exception as e:
    logger.error(f"Could not initialize database engine: {str(e)}")
    # Fallback to SQLite for development if Neon fails
    if "neon.tech" in SQLALCHEMY_DATABASE_URL:
        logger.warning("Falling back to SQLite database for development")
        engine = create_engine("sqlite:///./sql_app.db", connect_args={"check_same_thread": False})
    else:
        raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency with connection error handling
def get_db():
    db = SessionLocal()
    try:
        yield db
    except OperationalError as e:
        logger.error(f"Database operational error: {str(e)}")
        db.rollback()
        raise
    except Exception as e:
        logger.error(f"Database error: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()
