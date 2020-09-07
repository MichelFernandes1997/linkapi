db.createUser({
  user: 'teste',
  pwd: 'teste123',
  roles: [
    {
      role: 'readWrite',
      db: 'linkApi'
    }
  ]
})
