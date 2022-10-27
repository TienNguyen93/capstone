"""add uuid column

Revision ID: 461d75d910bf
Revises: 
Create Date: 2022-10-24 21:46:14.848692

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '461d75d910bf'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('eli_voter', sa.Column('uuid', postgresql.UUID(as_uuid=True), nullable=True))
    op.add_column('reg_voter', sa.Column('uuid', postgresql.UUID(as_uuid=True), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('reg_voter', 'uuid')
    op.drop_column('eli_voter', 'uuid')
    # ### end Alembic commands ###
