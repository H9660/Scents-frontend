export const createTransaction = async(data)=>{
  let transactionID = await fetch(`api/payment/createTransaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  transactionID = await transactionID.json();
  console.log(transactionID)
  return transactionID

}