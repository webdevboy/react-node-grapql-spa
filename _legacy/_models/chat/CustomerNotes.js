import Model from '../../sequelize';

const CustomerMessages = Model.define('chat_customer_notes', {/* nulled */},
  {
    timestamps: false,
    schema: 'public',
  },
);

export default CustomerMessages;
