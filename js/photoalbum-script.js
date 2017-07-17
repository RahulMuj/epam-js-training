'use strict'

var  app = new function() {
  function Photo(id, descrption, url){
          this.id = id;
          this.descrption = descrption;
          this.url = url;
  }

  function ImageException(message) {
           this.message = message;
           this.name = 'ImageNotProvidedException';

  }

  function ImageGetException(message) {
           this.message = message;
           this.name = 'ImageNotFoundException';
  }
      var photoListHolder = document.querySelector(".photos");

      /* Initialize Photo Album Store*/
      this.photoalbum = [
            new Photo ("Photo1.jpg", "Vehicle Image" ,"http://mydemo.com/1") ,
            new Photo ("Photo2.jpg", "Person Image" ,"http://mydemo.com/2") ,
            new Photo ("Photo3.jpg", "Mountain Image" ,"http://mydemo.com/3"),
            new Photo ("Photo4.jpg", "Food Image" ,"http://mydemo.com/4"),
            new Photo ("Photo5.jpg", "Mobile Image" ,"http://mydemo.com/5")
          ];

      /*
      Add new Photo to the photoAlbum Store and Return updated Store
      Currently this function adds photo via its description -dummyScenario
      */
      this.addPhoto = function (photo) {
        let photoDescription = document.querySelector(".add-name").value;
        if (photoDescription === null || photoDescription === '') {
        throw new ImageException('Cannot add,Image provided is null')
    		}

        let photoId = Math.random().toString(36).substr(2, 5) + ".jpg";
        let photoURL = "http://mydemo.com/" + Math.random().toString(36).substr(2, 3) ;
        /*in real scenario addPhoto() will receive newPhoto object
          for testing curent method using below approach  */
        let newPhoto = {
          id: photoId ,
          descrption: photoDescription,
          url: photoURL
        }
        this.photoalbum.push(newPhoto);
        this.FetchPhotoAlbum();
        document.querySelector(".add-name").value  = '';
      };

      /*Real scenario to add photo to Photoalbum Store
      @param -photo
      @return - updated store
      */
      this.addRealPhoto = function (photo) {
        if (photo === null ) {
    			throw new ImageException('Cannot add,Image provided is null')
    		}
        if (!photo.id){
           photo.id = Math.random().toString(36).substr(2, 5) + ".jpg";
        }
        this.photoalbum.push(photo);
        this.fetchRealAlbumStore();
      };

      /*
      Counts images from photoAlbum Store to print number
      of photos on screen
      */
      this.Count = function(imageCount) {
          let countHolder = document.querySelector(".counter");
          let name = 'photos';
          if (imageCount) {
            if (imageCount > 1) {
              name = 'Images in your Photo Album';
            }
            countHolder.innerHTML = imageCount + ' ' + name ;
          } else {
            countHolder.innerHTML = 'No ' + name;
          }
      };

      /*
      Returns Array of all images from photoAlbum Store- dummy Scenario
      */
      this.FetchPhotoAlbum = function() {
        let imagesList = '';
        if (this.photoalbum.length > 0) {
          for (let i = 0; i < this.photoalbum.length; i++) {
            imagesList += '<tr>';
            imagesList += '<td>' + this.photoalbum[i].id + '</td>';
            imagesList += '<td>' + this.photoalbum[i].descrption + '</td>';
            imagesList += '<td>' + this.photoalbum[i].url + '</td>';
            imagesList += '<td><button class="button" onclick="app.edit(' + i + ')">Edit</button></td>';
            imagesList += '<td><button  class="button" onclick="app.remove(' + i + ')">Delete</button></td>';
            imagesList += '</tr>';
          }
        }
        this.Count(this.photoalbum.length);
        return photoListHolder.innerHTML = imagesList;
      };


      /*
      Get image descrption by its id from photoAlbum Srore
      */
      this.getPhoto = function(photoId) {
        if (photoId) {
          return this.photoalbum.find( x => x.id === photoId).descrption
        }
        else{
          throw new ImageGetException('Cannot Find Image in Store')
        }
      };

      /*
       Edit image descrption of particular Image
       @param photoId (in real  scenario this param will be Image object, to be implemented later)
       @return  Updated Photo Album Store
      */
      this.edit = function (photoId) {
        var el = document.querySelector(".edit-name");
        el.value = this.photoalbum[photoId].descrption;
        el.disabled = false;
        document.querySelector(".spoiler").style.display = 'block';
        self = this;
          document.getElementById('saveEdit').onsubmit = function() {
            let photoDescription = el.value;
            if (photoDescription) {
            let modifiedPhoto = {
                id:self.photoalbum[photoId].id , descrption :photoDescription.trim() ,
                url: self.photoalbum[photoId].url
              }
              self.photoalbum.splice(photoId, 1, modifiedPhoto);
              self.FetchPhotoAlbum();
              CloseInput();
            }
          }
      };

      /*Real scenario to edit photo into Photoalbum Store
      @param -photo
      @return - updated store
      */
      this.editRealPhoto= function(photo){
          var imageforID = this.getPhoto(photo.id);
          if(imageforID){
            Object.assign(imageforID, photo);
          }
          this.fetchRealAlbumStore();
      };


      /*Real scenario to get all photos from Photoalbum Store
      @return - Photoalbum store
      */
      this.fetchRealAlbumStore = function(){
          this.photoalbum ;
      }


      /*
       Delete particular image from Photo Album
      */
      this.remove = function (photoId) {
        this.photoalbum.splice(photoId, 1);
        this.FetchPhotoAlbum();
      };
}

app.FetchPhotoAlbum();
function CloseInput() {
  document.querySelector(".spoiler").style.display = 'none';
}
