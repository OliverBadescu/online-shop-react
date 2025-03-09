

export default function OrderCard({order}){

    return(

        
        <>

        <div className="order-card">
        <h3>Order ID: {order.id}</h3>
            <p>Date: {order.orderDate}</p>
            <p>Total: ${order.amount}</p>
            <p>Status: {order.orderStatus}</p>
        </div>
        </>

    );

}