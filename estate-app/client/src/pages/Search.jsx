import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem'

const Search = () => {
    const navigate = useNavigate()
    const [sideBarData, setSideBarData] = useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',
    })
    const [loading, setLoading]= useState(false);
    const [listings, setListings]= useState([]);
    const [showMore, setShowMore] = useState(false)
    // console.log('sideBarData:', sideBarData)
    console.log('get-listing-data:', listings)
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermUrl = urlParams.get('searchTerm');
        const typeUrl = urlParams.get('type');
        const parkingUrl = urlParams.get('parking');
        const furnishedUrl = urlParams.get('furnished');
        const offerUrl = urlParams.get('offer');
        const sortUrl = urlParams.get('sort');
        const orderUrl = urlParams.get('order');

        if(searchTermUrl || typeUrl || parkingUrl || furnishedUrl || offerUrl || sortUrl || orderUrl){
            setSideBarData({
                searchTerm: searchTermUrl || '',
                type: typeUrl || 'all',
                parking: parkingUrl === 'true' ? true : false,
                furnished: furnishedUrl === 'true' ? true : false,
                offer: offerUrl === 'true' ? true : false,
                sort:sortUrl || 'created_at',
                order:orderUrl || 'desc' 
            })
        }
        const fetchListing =async()=>{
            setLoading(true)
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json()
            if(data.length > 8){
                setShowMore(true)
            }else{
                setShowMore(false)
            }
            setListings(data)
            setLoading(false)
        }
        fetchListing()
    },[location.search])


    const handleChange =(e)=>{
        if(e.target.id === 'all' || e.target.id === 'rent' ||  e.target.id === 'sale'){
            setSideBarData({...sideBarData, type : e.target.id})
        }

        if(e.target.id === 'searchTerm'){
            setSideBarData({...sideBarData, searchTerm : e.target.value})
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSideBarData({...sideBarData, [e.target.id] :  e.target.checked || e.target.checked === 'true' ? true :false})
        }

        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideBarData({...sideBarData, sort: sort, order: order})
        }
    }

    const handleSubmit= (e)=>{
        e.preventDefault()
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm)
        urlParams.set('type', sideBarData.type)
        urlParams.set('parking', sideBarData.parking)
        urlParams.set('furnished', sideBarData.furnished)
        urlParams.set('offer', sideBarData.offer)
        urlParams.set('sort', sideBarData.sort)
        urlParams.set('order', sideBarData.order)

        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`)
    }

    
    const showMoreResults=async()=>{
        const numberOfListings= listings.length;
        const startIndex =numberOfListings
        const urlParams = new URLSearchParams(location.search);
         urlParams.set('startIndex', startIndex);
         const searchQuery = urlParams.toString()
         const res = await fetch(`/api/listing/get?${searchQuery}`)
         const data = await res.json()
         if(data.length < 9){
            setShowMore(false)
         }
         setListings([...listings, ...data])
    }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-4 border-b-2 md:border-r-2 md:min-h-screen border-slate-300 '>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap'>Search Term</label>
                    <input type="text" value={sideBarData.searchTerm} onChange={handleChange} id='searchTerm' placeholder='Search...' className=' border rounded-lg p-3 full' />
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label >Type:</label>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="all" onChange={handleChange} checked={sideBarData.type === 'all'} className='w-5 h-5' />
                        <span>Rent and Sale</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="rent" onChange={handleChange} checked={sideBarData.type === 'rent'}  className='w-5 h-5' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="sale" onChange={handleChange} checked={sideBarData.type === 'sale'}  className='w-5 h-5' />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="offer" className='w-5 h-5' onChange={handleChange} checked={sideBarData.offer === true}  />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label >Amenties:</label>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="parking" className='w-5 h-5' onChange={handleChange} checked={sideBarData.parking === true} />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="furnished" className='w-5 h-5' onChange={handleChange} checked={sideBarData.furnished === true} />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label>Sort:</label>
                    <select 
                        id="sort_order"
                        className='border rounded-lg p-3'
                        onChange={handleChange}
                        defaultValue={'created_at_desc'}
                    >
                        <option value={'regularPrice_desc'}>Price High to Low</option>
                        <option value={'regularPrice_asc'}>Price Low to High</option>
                        <option value={'createdAt_desc'}>Latest</option>
                        <option value={'createdAt_asc'}>Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>
        <div className='flex-1'>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results:</h1>
            <div className='p-8 flex flex-wrap gap-3'>
                {
                    !loading && listings.length === 0 && (
                        <p className='text-large text-slate-700 p-3'>No Listing Found</p>
                    )
                    
                }
                {
                    loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                    )
                }

                {
                    !loading && listings && listings.map((listing)=>(
                        <ListingItem key = {listing._id} listing = {listing} />
                    ))
                }
                {/* {
                    showMore && (
                        <button className='text-green-700 hover:underline p-5 w-full text-center' onClick={showMoreResults}>
                            Show More Results
                        </button>
                    )
                } */}
            </div>
        </div>
    </div>
  )
}

export default Search