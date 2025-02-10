// module.exports={
//     HOST:'dpg-cuk98odds78s739lkim0-a.oregon-postgres.render.com',
//     USER:'user_name',
//     PASSWORD:'i8OqEouzKIGUyuIT0PUVe7a6sBu1KBgt',
//     DATABASE:'chinook_wmkh',
//     port: 5432,
//     DIALECT:'postgres'
//   }

module.exports={
  HOST:process.env.HOST,
  USER:process.env.USER,
  PASSWORD:process.env.PASSWORD,
  DATABASE:process.env.DATABASE,
  port: process.env.DBPORT,
  DIALECT:'postgres'
}
