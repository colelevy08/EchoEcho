"""empty message

Revision ID: 4da27cf36b85
Revises: 871c0db140c6
Create Date: 2023-08-10 00:56:23.396586

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4da27cf36b85'
down_revision = '871c0db140c6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.alter_column('product_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('quantity',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=64),
               type_=sa.String(length=100),
               nullable=False)
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=200),
               nullable=False)
        batch_op.alter_column('price',
               existing_type=sa.FLOAT(),
               nullable=False)
        batch_op.drop_index('ix_product_name')
        batch_op.drop_column('image_url')

    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('comment', sa.String(length=200), nullable=False))
        batch_op.alter_column('product_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('rating',
               existing_type=sa.FLOAT(),
               type_=sa.Integer(),
               nullable=False)
        batch_op.drop_column('body')

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.String(length=60), nullable=False))
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(length=64),
               type_=sa.String(length=80),
               nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
        batch_op.drop_index('ix_user_email')
        batch_op.drop_index('ix_user_username')
        batch_op.create_unique_constraint(None, ['email'])
        batch_op.create_unique_constraint(None, ['username'])
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.VARCHAR(length=128), nullable=True))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_index('ix_user_username', ['username'], unique=False)
        batch_op.create_index('ix_user_email', ['email'], unique=False)
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
        batch_op.alter_column('username',
               existing_type=sa.String(length=80),
               type_=sa.VARCHAR(length=64),
               nullable=True)
        batch_op.drop_column('password')

    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('body', sa.VARCHAR(length=500), nullable=True))
        batch_op.alter_column('rating',
               existing_type=sa.Integer(),
               type_=sa.FLOAT(),
               nullable=True)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('product_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_column('comment')

    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.VARCHAR(), nullable=True))
        batch_op.create_index('ix_product_name', ['name'], unique=False)
        batch_op.alter_column('price',
               existing_type=sa.FLOAT(),
               nullable=True)
        batch_op.alter_column('description',
               existing_type=sa.String(length=200),
               type_=sa.VARCHAR(length=120),
               nullable=True)
        batch_op.alter_column('name',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=64),
               nullable=True)

    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.alter_column('quantity',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('product_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    op.create_table('likes',
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('product_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    # ### end Alembic commands ###