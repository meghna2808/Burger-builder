import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where,orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./AuthContext"; 
import './Order.css'
const Order = () => {
    const { user } = useAuth(); // getting user
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const q = query(collection(db, "orders"), where("userId", "==", user.uid),orderBy("createdAt", "desc") );
                const querySnapshot = await getDocs(q);
                const fetchedOrders = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log("Fetched Orders:", fetchedOrders); 
                setOrders(fetchedOrders);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!orders.length) return <p>No orders found.</p>;

    return (
        <div className="order-container">
            <h2>Your Orders</h2>
            <div className="order-grid">
                {orders.map((order) => (
                    <div key={order.id} className="orderCard">
                        <h3>Order ID: {order.id}</h3>
                        <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                        <h4>Ingredients:</h4>
                        <ul>
                            {Object.entries(order.ingredients || {}).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                            ))}
                        </ul>
                        <p><strong>Order Date:</strong> {order.createdAt?.toDate().toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;