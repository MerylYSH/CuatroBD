import { supabase } from "../services/supabaseService";

// READ
export const getCustomers = async () => {
const { data, error } = await supabase
.from("customers")
.select("*");

if(error) console.log(error);

return data;
};

// CREATE
export const createCustomer = async (customer) => {
const { data, error } = await supabase
.from("customers")
.insert([customer])
.select();

if(error) console.log(error);

return data;
};

// UPDATE
export const updateCustomer = async (id, customer) => {
const { data, error } = await supabase
.from("customers")
.update(customer)
.eq("customer_id", id);

if(error) console.log(error);

return data;
};

// DELETE
export const deleteCustomer = async (id) => {
const { data, error } = await supabase
.from("customers")
.delete()
.eq("customer_id", id);

if(error) console.log(error);

return data;
};