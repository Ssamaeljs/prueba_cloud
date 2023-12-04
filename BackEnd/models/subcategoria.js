module.exports = (sequelize, DataTypes) => {
    const subcategoria = sequelize.define('subcategoria', {
        tipo: {
            type: DataTypes.STRING(30),
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

    subcategoria.associate = function (models) {
        subcategoria.belongsTo(models.categoria, {foreignKey: 'id_categoria'});
        subcategoria.hasMany(models.marca, { foreignKey: 'id_subcategoria', as: "marca"});
    }

    return subcategoria;
};