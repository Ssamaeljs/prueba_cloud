module.exports = (sequelize, DataTypes) => {
    const marca = sequelize.define('marca', {
        img: { 
            type: DataTypes.STRING, 
            defaultValue: "NO_DATA"
        },
        nombre: {
            type: DataTypes.STRING(20),
            defaultValue: "NO_DATA",
            unique: true
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

    marca.associate = function (models) {
        marca.belongsTo(models.subcategoria, {foreignKey: 'id_subcategoria'});
        marca.hasMany(models.producto, { foreignKey: 'id_marca', as: "producto"});
    }

    return marca;
};