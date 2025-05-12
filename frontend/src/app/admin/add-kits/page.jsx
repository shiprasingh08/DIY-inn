'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useFormik } from 'formik'

export default function AddKits() {
  const router = useRouter()

  const addkitsForm = useFormik({
    initialValues: {
      name: '',
      brand: '',
      category: '',
      price: '',
      description: '',
      image: '',
      videourl: '',
      stock: 0
    },
    onSubmit: (values, {resetForm}) => {
      axios.post('http://localhost:5000/kit/add', values)
      .then((result) => {
        console.log(result.data);
        toast.success('Kit added successfully!')
        resetForm();
      }).catch((err) => {
        console.log(err);
        toast.error('Failed to add kit. Please try again.')
      });
    }
  })

  const upload = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'diyInn')
    fd.append('colud_name', 'drqxuctyt')

    axios.post('https://api.cloudinary.com/v1_1/drqxuctyt/image/upload', fd)
        .then((result) => {
            toast.success('file upload successfully');
            console.log(result.data);
            // setPreview(result.data.url);
            addkitsForm.setFieldValue('image', result.data.url);
        }).catch((err) => {
            console.log(err);
            toast.error('failed to upload file');
        });
  }
  
  const uploadvideo = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'diyInn')
    fd.append('cloud_name', 'drqxuctyt')

    axios.post('https://api.cloudinary.com/v1_1/drqxuctyt/auto/upload', fd)
        .then((result) => {
            toast.success('file upload successfully');
            console.log(result.data);
            // setPreview(result.data.url);
            addkitsForm.setFieldValue('videourl', result.data.url);
        }).catch((err) => {
            console.log(err);
            toast.error('failed to upload file');
        });
  }

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6 space-y-6 border-2 border-pink-300">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black">Add New DIY Kit</h1>
            <p className="mt-2 text-sm text-gray-600">Enter the details of the new DIY kit below</p>
            <div className="w-24 h-1 bg-pink-400 mx-auto mt-3"></div>
          </div>

          <form onSubmit={addkitsForm.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black" htmlFor="name">
                Kit Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={addkitsForm.values.name}
                onChange={addkitsForm.handleChange}
                className="mt-1 block w-full rounded-md border border-pink-200 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                required
                placeholder="Enter kit name"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-black" htmlFor="brand">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={addkitsForm.values.brand}
                  onChange={addkitsForm.handleChange}
                  className="mt-1 block w-full rounded-md border border-pink-200 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black" htmlFor="category">
                  Category *
                </label>
                <select
                  name="category"
                  id="category"
                  value={addkitsForm.values.category}
                  onChange={addkitsForm.handleChange}
                  className="mt-1 block w-full rounded-md border border-pink-200 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Woodworking">Woodworking</option>
                  <option value="Crafts">Crafts</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Gardening">Gardening</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black" htmlFor="price">
                Price 
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-pink-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={addkitsForm.values.price}
                  onChange={addkitsForm.handleChange}
                  className="block w-full pl-7 pr-3 py-2 rounded-md border border-pink-200 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black" htmlFor="description">
                Description 
              </label>
              <textarea
                name="description"
                id="description"
                value={addkitsForm.values.description}
                onChange={addkitsForm.handleChange}
                rows="4"
                className="mt-1 block w-full rounded-md border border-pink-200 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Enter detailed description of the kit"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black" htmlFor="upload">
                Image URL 
                <span className="ml-2 inline-block px-2 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded-md cursor-pointer hover:bg-pink-200">
                  Browse
                  <input type="file" onChange={upload} id='upload' hidden/>
                </span>
              </label>
              <input
                type="text"
                name="image"
                id="image"
                value={addkitsForm.values.image}
                className="mt-1 block w-full rounded-md border border-pink-200 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Enter image URL"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black" htmlFor="uploadvideo">
                Video URL 
                <span className="ml-2 inline-block px-2 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded-md cursor-pointer hover:bg-pink-200">
                  Browse
                  <input type="file" onChange={uploadvideo} id='uploadvideo' hidden/>
                </span>
              </label>
              <input
                type="text"
                name="videourl"
                id="videourl"
                value={addkitsForm.values.videourl}
                className="mt-1 block w-full rounded-md border border-pink-200 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Enter video URL"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black" htmlFor="stock">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={addkitsForm.values.stock}
                onChange={addkitsForm.handleChange}
                className="mt-1 block w-full rounded-md border border-pink-200 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Enter stock quantity"
                min="0"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-pink-100">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-pink-300 rounded-md text-sm font-medium text-black hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Add Kit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}