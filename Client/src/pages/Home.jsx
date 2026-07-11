
import { FaSearch, FaStar } from "react-icons/fa";
import {Link} from "react-router-dom";
import bgImage2 from "../assets/bgImage2.png"
const restaurants = [
  {
    id: 1,
    name: "Under The Mango Tree",
    image:
      "https://res.cloudinary.com/dpl3xwf1z/image/upload/v1775671325/restaurants/69c58f340d577beee548c195/njneiftngfspzpn2wdig.avif",
    rating: 3.6,
    description:
      "Enjoy the thrill of grill and barbecue at Under The Mango Tree restaurant at Jehan Numa Palace, Bhopal. Head here now!",
    cuisines: ["Indian", "Chinese", "Italian"],
    link: "/restaurant-menu",
  },
  {
    id: 2,
    name: "Raj Darbar",
    image:
      "https://res.cloudinary.com/dpl3xwf1z/image/upload/v1774557305/restaurants/69c58f4b0d577beee548c198/fpdlv1viy4gucm1vrh7u.webp",
    rating: 4.8,
    description:
      "Raj Darbar is a one-of-a-kind Indian restaurant that offers a unique dining experience for families and friends with a dhaba-style theme.",
    cuisines: ["Indian", "Chinese", "Italian"],
    link: "/restaurant-menu2",
  },
  {
    id: 3,
    name: "Countryside Culture",
    image:
      "https://res.cloudinary.com/dpl3xwf1z/image/upload/v1774557446/restaurants/69c590150d577beee548c19b/htwjijdrr2gbjdaf355s.webp",
    rating: 4.1,
    description:
      "A hidden gem away from the city, offering lush green meadows and peaceful walking paths for relaxation.",
    cuisines: ["Indian", "Chinese"],
    link: "/restaurant-menu3",
  },
];

const stats = [
  {
    value: "2.5M+",
    title: "Successful Deliveries",
    desc: "Orders delivered with care and precision",
    color: "text-red-500",
  },
  {
    value: "500K+",
    title: "Happy Customers",
    desc: "Satisfied users enjoying delicious food",
    color: "text-green-500",
  },
  {
    value: "5K+",
    title: "Partner Restaurants",
    desc: "Restaurants serving amazing cuisine",
    color: "text-blue-500",
  },
  {
    value: "1K+",
    title: "Active Delivery Partners",
    desc: "Riders ensuring quick and safe delivery",
    color: "text-yellow-500",
  },
];

const reviews = [
  {
    name: "Arun J.",
    initials: "AJ",
    title: "Amazing Service!",
    review:
      "The food arrived hot and fresh. The delivery was incredibly fast. Highly impressed with Cravings' service!",
  },
  {
    name: "Sneha P.",
    initials: "SP",
    title: "Best App Ever!",
    review:
      "Easy to use interface, wide variety of restaurants, and quick delivery. I order from Cravings every week!",
  },
  {
    name: "Raj Kumar",
    initials: "RK",
    title: "Excellent Choices",
    review:
      "Love the variety of restaurants available. Found my new favorite spot through Cravings.",
  },
];


const Home = () => {
  return (
    <>
      <div>
        {/* Hero Section */}
        <section className="relative">
          <img
            src={bgImage2}
            alt="Hero"
            className="w-full h- [650px] object-cover"
          />

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-5">
            <h1 className="text-5xl font-bold mb-4">
              Your Favorite Food,
              <br />
              Delivered Fast
            </h1>

            <p className="text-xl mb-8">
              Order from thousands of restaurants and get it delivered to your
              doorstep
            </p>

            <div className="flex gap-5">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
              >
                Sign Up
              </Link>

              <Link
                to="/order-now"
                className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold"
              >
                Order Now
              </Link>
            </div>
          </div>

          {/* Search Box */}

          <div className="absolute bottom- [-30px] left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg flex items-center px-5 py-4 w-11/12 max-w-2xl">
            <FaSearch className="text-gray-500 mr-3" />

            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              className="w-full outline-none"
            />
          </div>
        </section>

        {/* Featured Restaurants */}

        <section className="bg-slate-900 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-4xl text-white font-bold">
              Featured Restaurants
            </h2>

            <p className="text-gray-300 mt-2 mb-8">
              {restaurants.length} Restaurants Available
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                >
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="h-60 w-full object-cover"
                    />

                    <div className="absolute top-3 right-3 bg-yellow-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FaStar />

                      {restaurant.rating}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-3">
                      {restaurant.name}
                    </h3>

                    <p className="text-gray-600 mb-4">
                      {restaurant.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {restaurant.cuisines.map((item) => (
                        <span
                          key={item}
                          className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={restaurant.link}
                      className="block text-center bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg"
                    >
                      Explore Menu
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-5 text-center">
            <h2 className="text-4xl font-bold">Cravings by the Numbers</h2>

            <p className="text-gray-500 mt-3">
              See why millions trust us for their daily food delivery needs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h1 className={`text-5xl font-bold ${stat.color}`}>
                    {stat.value}
                  </h1>

                  <h3 className="font-semibold text-xl mt-4">{stat.title}</h3>

                  <p className="text-gray-500 mt-2">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews */}

        <section className="bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-5 text-center">
            <h2 className="text-4xl font-bold">What Our Customers Say</h2>

            <p className="text-gray-500 mt-3">
              Real feedback from real food lovers
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="bg-white p-8 rounded-xl shadow-lg"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  <h3 className="font-bold text-xl">{review.title}</h3>

                  <p className="text-gray-600 mt-4">"{review.review}"</p>

                  <div className="flex items-center mt-6">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                      {review.initials}
                    </div>

                    <div className="ml-4 text-left">
                      <h4 className="font-semibold">{review.name}</h4>

                      <p className="text-gray-500 text-sm">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Section */}

        <section className="bg-slate-900 py-20 text-center text-white">
          <h2 className="text-4xl font-bold">Become a Restaurant Partner</h2>

          <p className="text-xl mt-5">
            Grow your business with Cravings. Join thousands of restaurants
            already delivering with us.
          </p>

          <button className="bg-white text-black mt-8 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200">
            Partner With Us
          </button>
        </section>
      </div>
    </>
  );
};

export default Home;