module.exports = (sequelize, DataTypes) => {
  const dispositivo = sequelize.define(
    "dispositivo",
    {
      external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      identificador: { type: DataTypes.INTEGER, allowNull: false },
      latitud: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "0",
      },
      longitud: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "0",
      },
      estado: { type: DataTypes.BOOLEAN, defaultValue: true },
      correo: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      clave: { type: DataTypes.STRING(150), allowNull: false },
    },
    {
      freezeTableName: true,
    }
  );

  dispositivo.associate = function (models) {
    dispositivo.hasMany(models.medicion, { foreignKey: "id_dispositivo" });
  };

  return dispositivo;
};
