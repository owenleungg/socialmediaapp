module.exports = (sequelize, Datatypes) => {

    const posts = sequelize.define("Posts", {
        title: {
            type: Datatypes.STRING, 
            allowNull: false,
        },
        postText: {
            type: Datatypes.STRING, 
            allowNull: false,
        },
        username: {
            type: Datatypes.STRING, 
            allowNull: false,
        }
    })

    return posts;
}