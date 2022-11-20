import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel({
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    address: req.body.address,
    distance: req.body.distance,
    title: req.body.title,
    desc: req.body.desc,
    rating: req.body.rating,
    cheapestPrice: req.body.cheapestPrice,
  });

  try {
    const saveHotel = await newHotel.save();
    res.status(200).send(saveHotel);
    // console.log(saveHotel);
  } catch (error) {
    next(error);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been deleted ");
  } catch (error) {
    next(error);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotels = await Hotel.findById(req.params.id);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
    const resortCount = await Hotel.countDocuments({ type: "resorts" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
