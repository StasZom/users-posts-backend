const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('postProject')

db.serialize(()=>{


    // создаем таблицы users и posts с AutoIncrement
    // db.run("CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)")
    // db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id NUMBER, text TEXT, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE)")

    // Добавляем значения в таблицу
    db.run("INSERT INTO users (name, password) VALUES ('Stas', '5252')")
    // db.run("INSERT INTO posts (user_id, text) VALUES (1, 'Это мой первый пост')")


    // Удаление таблиц
    // db.run("DROP TABLE users")
    // db.run("DROP TABLE posts")
    




    // Отображаем данные из таблицы
    db.all('SELECT * FROM posts', (err,data)=>{
        console.log(data);
    })
    db.all('SELECT * FROM users', (err,data)=>{
        console.log(data);
    })
})