import React from 'react'
import './../../src/support/testimony.css'
import Image1 from './../support/img/p1.png' 
import Image2 from './../support/img/p2.png'
import Image3 from './../support/img/p3.png'

class Testimoni extends React.Component{
    render(){
        return(
            <div class="testimonials">
      <div class="inner">
        <div class="row">
          <div class="col">
            <div class="testimonial">
              <img src={Image1} alt=""/>
              <div class="name">Mike Thomson</div>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>

              <p>
              Beli di Preloved sangat menyenangkan, harganya sangat miring sekali; sampai saya pun kaget apakah ini salah harga apa tidak, pelayanan sangat cepat dan ramah. Recommended sekali untuk yang incer barang langka yang High-end.
              </p>
            </div>
          </div>

        

          <div class="col">
            <div class="testimonial">
              <img src={Image2} alt=""/>
              <div class="name">Audrey</div>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
              </div>

              <p>
              Semenjak saya mengetahui link preloved.com awalnya iseng-iseng aja. Idenya bagus untuk menyalurkan barang-barang branded yang masih layak banget buat bisa dijual. Karena kadang kita sebagai perempuan senang belanja, lemari udah penuh, atau salah pilih ukuran, ada aja deh ceritanya. Happy sekarang jadi gak usah bingung lagi mau diapain daripada pajang di kamar, bisa untuk beli produk yang baru lagi.
              </p>
            </div>
          </div>

          <div class="col">
            <div class="testimonial">
              <img src={Image3} alt=""/>
              <div class="name">Michelle Jordey</div>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
              </div>

              <p>
              Preloved, A very reliable, complete and one of the highest traffic preloved website. I am very happy and satisfied with your service. Keep up the good work and thank you for cleaning up my wardrobe!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

        )
    }
}

export default Testimoni;