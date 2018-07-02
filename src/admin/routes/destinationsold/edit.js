export default async ({
  id, toaster, state, action, cancel,
}) => {
  this.toaster.clear();

  const { item } = this.state;
  const { body } = this.state.item;
  const content = editorStateToJSON(body);

  const stateItem = Object.assign({}, item, { body: content });
  const { response } = await action(id, stateItem);

  // check for errors
  toaster.show(response.errors ? {
    message: response.errors.graphQLErrors[0].message || null,
    timeout: 3000,
    intent: Intent.DANGER,
    iconName: "pt-icon-error",
  } : {
    message: "Destination edited successfully!",
    timeout: 3000,
    intent: Intent.SUCCESS,
    iconName: "pt-icon-success",
    action: {
      text: "Ok",
      onClick: cancel,
    },
  });
};
