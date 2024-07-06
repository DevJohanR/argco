from app.extensions import db
from app.main import create_app

app = create_app()

with app.app_context():
    try:
     
        with db.engine.connect() as connection:
            result = connection.execute('SELECT 1')
            print("Conexión exitosa a la base de datos:", result.fetchone())
    except Exception as e:
        print("Error al conectar a la base de datos:", e)
