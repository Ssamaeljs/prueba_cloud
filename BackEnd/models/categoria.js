module.exports = (sequelize, DataTypes) => {
    const categoria = sequelize.define('categoria', {
        tipo: {
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

    categoria.associate = function (models) {
        categoria.hasMany(models.subcategoria, { foreignKey: 'id_categoria', as: "subcategoria"});
    }

    return categoria;
};