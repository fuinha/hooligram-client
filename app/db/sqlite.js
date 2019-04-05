import SQLite from 'react-native-sqlite-storage'

let instance

SQLite.DEBUG(true)
SQLite.enablePromise(true)
SQLite.openDatabase({ name: 'hooligram-v2-client.db' })
  .then((db) => {
    instance = db
  })
  .then(() => {
    instance.executeSql(`
      CREATE TABLE IF NOT EXISTS contact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sid TEXT NOT NULL UNIQUE
      );
    `)
  })

////////////
// CREATE //
////////////

export const createContact = async (sid) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql('INSERT INTO contact ( sid ) VALUES ( ? );', [sid])
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('error creating contact.', err.toString())
    })
}

//////////
// READ //
//////////

export const readContacts = async () => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql('SELECT id, sid FROM contact;')
    .then(([results]) => {
      contacts = []

      for (let i = 0; i < results.rows.length; i++) {
        contacts.push(results.rows.item(i))
      }

      return contacts
    })
    .catch((err) => {
      console.log('error reading contacts.', err.toString())
    })
}

////////////
// UPDATE //
////////////

////////////
// DELETE //
////////////

export const deleteContact = async (id) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql('DELETE FROM contact WHERE id = ?;', [id])
    .then(([results]) => {
      return true
    })
    .catch(err => {
      console.log('error deleting contact.', err.toString())
      return false
    })
}
