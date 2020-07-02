import React from 'react';
import Swiper from 'react-id-swiper';
import Link from 'next/link';

 
const SimpleSwiperWithParams = (_data) => {
    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      spaceBetween: 30
    }
   
    return(
      <Swiper {...params} data={_data}>
        <ul>
          {data.map((index, v) => {  
            <Link key={index}>
              <a>
                {v}
              </a>
            </Link>
          })}
        </ul>   
      </Swiper>
    );
  }
   
  export default SimpleSwiperWithParams;