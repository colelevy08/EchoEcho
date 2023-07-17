"""empty message

Revision ID: 25b06ba199e0
Revises: d25754c03fed
Create Date: 2023-07-15 19:38:43.662448

"""
from alembic import op
from sqlalchemy import engine, create_engine
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '25b06ba199e0'
down_revision = 'd25754c03fed'
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    # Check if the 'user' table exists
    if 'user' not in inspector.get_table_names():
        op.create_table(
            'user',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('username', sa.String(length=64), nullable=True),
            sa.Column('email', sa.String(length=120), nullable=True),
            sa.Column('password_hash', sa.String(length=128), nullable=True),
            sa.PrimaryKeyConstraint('id')
        )

    # Check if the 'friendship' table exists
    if 'friendship' not in inspector.get_table_names():
        op.create_table(
            'friendship',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('user_id', sa.Integer(), nullable=True),
            sa.Column('friend_id', sa.Integer(), nullable=True),
            sa.Column('timestamp', sa.DateTime(), nullable=True),
            sa.ForeignKeyConstraint(['friend_id'], ['user.id'], ),
            sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
            sa.PrimaryKeyConstraint('id')
        )

    # Check if the 'message' table exists
    if 'message' not in inspector.get_table_names():
        op.create_table(
            'message',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('sender_id', sa.Integer(), nullable=True),
            sa.Column('recipient_id', sa.Integer(), nullable=True),
            sa.Column('body', sa.String(length=140), nullable=True),
            sa.Column('timestamp', sa.DateTime(), nullable=True),
            sa.ForeignKeyConstraint(['recipient_id'], ['user.id'], ),
            sa.ForeignKeyConstraint(['sender_id'], ['user.id'], ),
            sa.PrimaryKeyConstraint('id')
        )

    # Check if the 'product' table exists
    if 'product' not in inspector.get_table_names():
        op.create_table(
            'product',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('user_id', sa.Integer(), nullable=True),
            sa.Column('name', sa.String(length=64), nullable=True),
            sa.Column('description', sa.String(length=256), nullable=True),
            sa.Column('price', sa.Float(), nullable=True),
            sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
            sa.PrimaryKeyConstraint('id')
        )

    # Check if the 'order' table exists
    if 'order' not in inspector.get_table_names():
        op.create_table(
            'order',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('user_id', sa.Integer(), nullable=True),
            sa.Column('product_id', sa.Integer(), nullable=True),
            sa.Column('timestamp', sa.DateTime(), nullable=True),
            sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
            sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
            sa.PrimaryKeyConstraint('id')
        )

    # Check if the 'review' table exists
    if 'review' not in inspector.get_table_names():
        op.create_table(
            'review',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('user_id', sa.Integer(), nullable=True),
            sa.Column('product_id', sa.Integer(), nullable=True),
            sa.Column('body', sa.String(length=140), nullable=True),
            sa.Column('rating', sa.Integer(), nullable=True),
            sa.Column('timestamp', sa.DateTime(), nullable=True),
            sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
            sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
            sa.PrimaryKeyConstraint('id')
        )

def downgrade():
    # Drop the 'review' table
    op.drop_table('review')
    # Drop the 'order' table
    op.drop_table('order')
    # Drop the 'product' table
    op.drop_table('product')
    # Drop the 'message' table
    op.drop_table('message')
    # Drop the 'friendship' table
    op.drop_table('friendship')
    # Drop the 'user' table
    op.drop_table('user')
