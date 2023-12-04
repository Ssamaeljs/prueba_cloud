module.exports = (sequelize, DataTypes) => {
    const producto = sequelize.define('producto', {
        img: { 
            type: DataTypes.STRING, 
            defaultValue: "NO_DATA"
        },
        nombre: {
            type: DataTypes.STRING(20),
            defaultValue: "NO_DATA"
        },
        precio: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
        },
        description:{
            type: DataTypes.STRING(50),
            defaultValue: null
        },
        external_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, //tiene 36 caracteres
            unique: true,
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { freezeTableName: true });

    producto.associate = function (models) {
        producto.belongsTo(models.marca, {foreignKey: 'id_marca'});
    }

    return producto;
};