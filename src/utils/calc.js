export const calculateInvoiceTotal = (items) => {
  let total = 0;
  for (const item of items) {
    total += Number(item.price) * item.qty - Number(item.discount || 0);
  }
  return total;
};
