exports.handler = async (event) => {
  console.log(event);

  var object_id_string = event.object_id + "";
  var owner_id_string = event.owner_id + "";

  var params = {
    object_id: object_id_string,
    owner_id: owner_id_string,
  };

  return params;
};
