import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle'
import ListingItem from '../components/ListingItem';

const Home = () => {
  const [offerListings,setOfferListings]= useState([])
  const [saleListings,setSaleListings]= useState([])
  const [rentListings,setRentListings]= useState([])
  SwiperCore.use([Navigation])
  // console.log('saleListings:', saleListings)
  useEffect(()=>{
    const fetchOfferListing=async()=>{
      try {
        const res= await fetch(`/api/listing/get?offer=true&limit=4`)
        const data = await res.json();
        setOfferListings(data)
        fetchRentListing()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListing=async()=>{
      try {
        const res= await fetch(`/api/listing/get?rent=true&limit=4`)
        const data = await res.json();
        setRentListings(data)
        fetchSaleListing()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListing =async()=>{
      try {
        const res= await fetch(`/api/listing/get?sale=true&limit=4`)
        const data = await res.json();
        setSaleListings(data)
        
      } catch (error) {
        console.log(error)
      }

    }
    fetchOfferListing()
  },[])
  return (
    <div>
      <div className='flex flex-col gap-4 p-20 px-4 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 text-3xl font-bold lg:text-6xl'>Find Your Next Home 
        <br />
         <span className='text-slate-500'>and Share the Experience</span></h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Grey Estate is the best place to find yout next Home
        </div>
        <Link to={'/search'} className='text-xs sm:text-lg text-blue-600 font-bold hover:underline'>
          Lets Get Started
        </Link>
      </div>
      <Swiper navigation>
      {
        offerListings && offerListings.length > 0 && offerListings.map((offerListing)=>(
          <SwiperSlide>
            <div className='h-[500px]' key={offerListing._id} style={{background:`url(${offerListing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}}>

            </div>
          </SwiperSlide>
        ))
      }
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-7 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                  <Link className='text-sm text-blue-600 hover:underline' to={'/search?offer=true'}>
                    Show More Offers
                  </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    offerListings.map((offerListing)=>(

                      <ListingItem listing={offerListing} key={offerListing._id}/>
                    ))
                  }
                </div>
            </div>
          ) 
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent Rents</h2>
                  <Link className='text-sm text-blue-600 hover:underline' to={'/search?offer=true'}>
                    Show More Rents
                  </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    rentListings.map((rentListing)=>(

                      <ListingItem listing={rentListing} key={rentListing._id}/>
                    ))
                  }
                </div>
            </div>
          ) 
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent Sales</h2>
                  <Link className='text-sm text-blue-600 hover:underline' to={'/search?offer=true'}>
                    Show More Sales
                  </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    saleListings.map((saleListing)=>(

                      <ListingItem listing={saleListing} key={saleListing._id}/>
                    ))
                  }
                </div>
            </div>
          ) 
        }
      </div>
    </div>
  )
}

export default Home