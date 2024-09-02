import { Grid } from '@mui/material';
import SalesCard from '../components/SalesCard';
import SalesChart from '../components/SalesChart';
import { useSelector } from 'react-redux';

const SellerHomePage = () => {
  // Retrieve data from the Redux store
  const { specificProductData } = useSelector(state => state.user);

  // Calculate totals
  const addedToCartTotal = specificProductData ? specificProductData.length : 0;
  const ongoingOrdersTotal = specificProductData
    ? specificProductData.filter(product => product.status === 'ongoing').length
    : 0;
  const outForDeliveryTotal = specificProductData
    ? specificProductData.filter(product => product.status === 'outForDelivery').length
    : 0;

  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Weekly Sales" total={0} color='primary' icon={'ant-design:carry-out-filled'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Added to Cart" total={addedToCartTotal} color="success" icon={'ant-design:shopping-cart-outlined'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Ongoing Orders" total={ongoingOrdersTotal} color="warning" icon={'material-symbols:data-exploration'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Out for Delivery" total={outForDeliveryTotal} color="info" icon={'material-symbols:local-shipping'} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="line" />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="bar" />
      </Grid>
    </Grid>
  );
};

export default SellerHomePage;
