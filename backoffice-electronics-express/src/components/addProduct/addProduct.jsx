import React from 'react'
import { AutoComplete } from "rsuite";

import './addProduct.css'

export default function AddProduct() {
  const autoList1 = [{
    name: "John",
    age: 12,
  },
  {
    name: "Ben",
    age: 12,
    }
  ]
  const autoList = autoList1?.map(item=>item.name)
  return (
    <div className='row add-product'>
      <div className='col-12 col-sm-6'>
      <label htmlFor="quantity" className="form-label">Article</label>
      <AutoComplete
              data={autoList}
              
              onSelect={(item, evt) => {
                console.log(item)
              }}
        />
      </div>
        
<div className="mb-3 col-12 col-sm-3">
  <label htmlFor="quantity" className="form-label">Quantité</label>
  <input type="number" min="1" className="form-control" name='quantity'/>
</div>
<div className="mb-3 col-12 col-sm-3">   
  <button type="button" className="btn btn-success mt-4">Ajouter</button>
</div>
</div>
  )
}
