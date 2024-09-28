import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { fetchCategories } from '../redux/categoriesSlice';
import { fetchProducts } from '../redux/productsSlice';

const Products = () => {  
  const dispatch = useDispatch();  
  const products = useSelector((state) => state.products.items);  
  const productsStatus = useSelector((state) => state.products.status);  
  const categories = useSelector((state) => state.categories.items);  
  const [page, setPage] = useState(1);  
  const [searchQuery, setSearchQuery] = useState('');  
  const [selectedCategory, setSelectedCategory] = useState('');  
  
  useEffect(() => {  
    dispatch(fetchProducts());  
    dispatch(fetchCategories());  
  }, [dispatch]);  
  
  const selectPageHandler = (selectedPage) => {  
    if (selectedPage >= 1 && selectedPage <= Math.ceil(filteredProducts.length / 10) && selectedPage !== page)  
      setPage(selectedPage);  
  };  
  
  const filteredProducts = products.filter(prod =>  
    (selectedCategory === '' || prod.category === selectedCategory) &&  
    (searchQuery === '' || prod.title.toLowerCase().includes(searchQuery.toLowerCase()))  
  );  
  
  return (  
    <>  
      <h2 className='header'>The Products Category</h2>  
      <div className='filters'>  
        <div className='search'>  
          <input  
            type="text"  
            placeholder="Search by title..."  
            value={searchQuery}  
            onChange={(e) => setSearchQuery(e.target.value)}  
            className='p-2 border rounded-lg'  
          />  
        </div>  
        <select  
          value={selectedCategory}  
          onChange={(e) => setSelectedCategory(e.target.value)}  
          className='p-2 border rounded-lg'  
        >  
          <option value="">All Categories</option>  
          {categories.map((category, index) => (  
            <option key={index} value={category.slug}>{category.name}</option>  
          ))}  
        </select>  
      </div>  

      {productsStatus === 'loading' ? (  
        <div className="bouncing-loader">  
          <div></div>  
          <div></div>  
          <div></div>  
        </div>  
      ) : (  
        <>  
          {filteredProducts.length > 0 && (  
            <div className='posts'>  
              {filteredProducts.slice(page * 10 - 10, page * 10).map((prod) => (  
                <div key={prod.id} className="post bg-gray-100 border-2 border-gray-200 hover:shadow-2xl transition-shadow duration-300 rounded-xl flex flex-col justify-center items-center cursor-pointer">  
                  <img className='h-52 w-52 lg:h-72 lg:w-72 rounded-lg object-cover' src={prod.thumbnail} alt={prod.title} />  
                  <h3 className='text-sm lg:text-lg tracking-widest p-1 text-gray-500'> {prod.title}</h3>  
                  <p className='text-sm lg:text-lg tracking-widest p-1 text-gray-500'>Category : {prod.category}</p>  
                  <p className='text-sm lg:text-lg tracking-widest p-1 text-gray-500'>Price : ${prod.price}</p>  
                </div>  
              ))}  
            </div>  
          )}

          {filteredProducts.length > 0 && (  
            <div className='pagination'>  
              <span  
                onClick={() => selectPageHandler(page - 1)}  
                className={`page-button ${page > 1 ? "" : "disabled"}`}  
              >  
                {"<<"}  
              </span>  
              {[...Array(Math.ceil(filteredProducts.length / 10))].map((_, i) => (  
                <span  
                  onClick={() => selectPageHandler(i + 1)}  
                  key={i}  
                  className={`page-button ${page === i + 1 ? "active" : ""}`}  
                >  
                  {i + 1}  
                </span>  
              ))}  
              <span  
                onClick={() => selectPageHandler(page + 1)}  
                className={`page-button ${page < Math.ceil(filteredProducts.length / 10) ? "" : "disabled"}`}  
              >  
                {">>"}  
              </span>  
            </div>  
          )}  
        </>  
      )}  
    </>  
  );  
};  

export default Products;  
