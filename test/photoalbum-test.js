
describe("PhotoAlbum Test Cases", function() {
  var dummyImage = {
  	id : Photo1.jpg,
  	url : 'http://mydemo.com/1',
  	description : 'Person Image'
  }

  var dummyImageEdited = {
    id : Photo1.jpg,
    url : 'http://mydemo.com/1',
    description : 'PersonEdited Image'
  }

  it("Add Photo to PhotoAlbum", function() {
    app.addRealPhoto(dummyImage);
    expect(app.FetchPhotoAlbum().length).toBe(1);
  });

  it("Delete Photo From Photo Album", function() {
  	app.remove(Photo1.jpg);
  	expect(app.FetchPhotoAlbum().length).toBe(0);
  });

  it("Edit Photo into Photo Album", function() {
  	app.edit(dummyImageEdited);

  	var editedImage = app.getPhoto(Photo1.jpg);
  	expect(editedImage.description).toBe(dummyImageEdited.description);
  });

});
