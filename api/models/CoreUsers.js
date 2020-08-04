module.exports = {
  tableName: 'core_users',
  attributes: {
  
    name: {
        type: 'string',
        columnType: 'varchar'
    },
    username: {
        type: 'string',
        columnType: 'varchar'
    },
    password: {
        type: 'string',
        columnType: 'varchar'
    },
    email: {
        type: 'string',
        columnType: 'varchar'
    },
    birth_date: {
        type: 'ref',
        columnType: 'date'
    },
    address: {
        type: 'string',
        columnType: 'varchar'
    },
    phone: {
        type: 'string',
        columnType: 'varchar'
    },
    gender: {
        type: 'number',
        columnType: 'tinyint'
    },
    avatar: {
        type: 'string',
        columnType: 'varchar'
    },
    id_facebook: {
        type: 'string',
        columnType: 'varchar'
    },
    id_google: {
        type: 'string',
        columnType: 'varchar'
    },
    city: {
        type: 'number',
        columnType: 'int'
    },
    district: {
        type: 'number',
        columnType: 'int'
    },
    registered_at_software: {
        type: 'number',
        columnType: 'int'
    },
    registered_at_site: {
        type: 'number',
        columnType: 'int'
    },
    note: {
        type: 'string',
        columnType: 'text'
    },
    registered: {
        type: 'ref',
        columnType: 'datetime'
    },
    lastlogined: {
        type: 'ref',
        columnType: 'datetime'
    }
  }
};