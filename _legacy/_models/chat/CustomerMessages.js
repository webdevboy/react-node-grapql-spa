import Model from '../../sequelize';

const CustomerMessages = Model.define('chat_customer_messages', {/* nulled */},
  {
    timestamps: false,
    schema: 'public',
  },
);

export default CustomerMessages;
