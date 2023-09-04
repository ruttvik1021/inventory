import Drawer from "@/components/drawer";

const AddProduct = ({ productFormik, editProduct, closeDrawer }: any) => {
  console.log("productFormik", productFormik.values);
  return (
    <Drawer show={editProduct} setShow={closeDrawer}>
      Hello
    </Drawer>
  );
};

export default AddProduct;
