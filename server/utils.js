export const GetProjection = (info) => {
  const finalobj = {};
  info.fieldNodes[0].selectionSet.selections.map((item) => {
    finalobj[item.name.value] = 1;
  });
  return finalobj;
};
