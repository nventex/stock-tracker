module.exports = {
    
    getDbConnectionString: function() {
        return process.env.mongoUri
                .replace("{{dbUser}}", process.env.dbUser)
                .replace("{{dbPassword}}", process.env.dbPassword);
    }
   
}