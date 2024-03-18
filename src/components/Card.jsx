import { Button } from "@material-tailwind/react";

const CustomCard = (props) => {
  return (
    <div className="lg:w-1/2 sm:w-full p-2">
      <div className="bg-white border shadow-lg p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-2/5 mb-4 sm:mb-0">
            <img
              src={props.gambar}
              className="w-full h-52 object-cover"
              alt={props.namaMenu}
            />
          </div>

          <div className="sm:w-3/5 pl-0 sm:pl-4">
            <h5 className="text-gray-800 text-xl font-semibold mb-2">
              {props.namaMenu}
            </h5>
            <h6 className="text-gray-600">Jenis: {props.jenis}</h6>
            <h6 className="text-gray-800">Harga: Rp {props.harga}</h6>
            <p className="text-gray-600 mb-3">{props.deskripsi}</p>

            <div className="flex mt-2 sm:mt-0">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 mr-3"
                onClick={props.onEdit}
              >
                Edit
              </Button>

              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={props.onDrop}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
