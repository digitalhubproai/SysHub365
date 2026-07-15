import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL") or os.getenv("NEON_DATABASE_URL", "sqlite:///./sql_app.db")

ca = {}
if SQLALCHEMY_DATABASE_URL and any(d in SQLALCHEMY_DATABASE_URL for d in ["neon.tech", "insforge.app"]):
    ca = {"sslmode": "require", "connect_timeout": 10}

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=False,
    pool_recycle=300,
    connect_args=ca
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    except OperationalError as e:
        logger.error(f"Database error: {str(e)}")
        db.rollback()
        raise
    except Exception as e:
        logger.error(f"Database error: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()
