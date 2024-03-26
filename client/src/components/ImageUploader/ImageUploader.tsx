import { Button } from 'primereact/button';
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface ImageUploaderProps {
  images: ImageListType;
  setImages: (images: ImageListType) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages }) => {
  const onChange = (imageList: ImageListType, addUpdateIndex?: number[] | undefined) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={20}
      dataURLKey="data_url"
      acceptType={['jpg', 'png', 'jpeg']}
    >
      {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
        // write your building UI
        <div className="flex flex-column gap-2 w-full align-items-center justify-content-center">
          <div className="flex gap-2 justify-content-center">
            <Button
              {...dragProps}
              style={isDragging ? { backgroundColor: 'red' } : undefined}
              onClick={onImageUpload}
              label="Paspauskite arba nutempkite nuotraukas čia"
              icon="pi pi-upload"
              iconPos="top"
              className="w-4"
            />
            <Button
              style={{ backgroundColor: 'red', borderColor: 'red' }}
              onClick={onImageRemoveAll}
              label="Panaikinti visas nuotraukas"
              icon="pi pi-times"
              iconPos="top"
              className="w-4"
            />
          </div>

          <div className="row w-full justify-content-center flex gap-5 flex-wrap">
            {imageList.map((image, index) => (
              <div key={index} className="flex gap-2 col-4">
                <img src={image['data_url']} alt="" style={{ maxWidth: '300px' }} />
                <div className="flex flex-column gap-1 justify-content-center">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  );
};
