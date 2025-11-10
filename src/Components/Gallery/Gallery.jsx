
const galleryItems = [
  {
    image: 'https://i.postimg.cc/QCFB665V/asset-ecd857f8.jpg', 
    title: 'Create Impactful Events',
    subtitle: 'Easy Event Creation',
    description: `Easily create and manage events with intuitive tools. Reach more volunteers and maximize your community impact effortlessly.`,
    features: [
      'Simple event creation',
      'Track event progress',
      'Manage event details'
    ],
    imageOnLeft: true,
  },
  {
    image: 'https://i.postimg.cc/85jW3PgC/adobestock-173678266-4b5c9fe2848a40d68964c61a4d775304.jpg', 
    title: 'Find Events Near You',
    subtitle: 'Seamless Event Discovery',
    description: `Discover local social service events tailored to your interests. Join cleanup drives, plantation efforts, donation drives, and more. Connect with your community.`,
    features: [
      'Filter events easily',
      'Track joined events',
      'Join events instantly'
    ],
    imageOnLeft: false,
  },

    {
    image: 'https://i.postimg.cc/Wzq3mdLg/asset-de297f77.jpg', 
    title: 'Manage Events Easily',
    subtitle: 'Centralized Event Management',
    description: `Manage your created events, update details, and track participation. Simplify event coordination and maximize your community engagement.`,
    features: [
       "Update event details",
        "Simplify coordination",
        "Track event progress"
    ],
    imageOnLeft: true,
  }
];

const Gallery = () => {
  return (
    <div className="w-full bg-white ">
        <div className="text-center mb-7 py-9">
            <h1 className="text-2xl md:text-5xl font-semibold text-gray-900 leading-tight ">Empowering Social Impact Together</h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm text-gray-600">
            CommunityConnect Events offers a platform to create, join, and manage
            social service events, fostering community engagement and positive
            local impact.
          </p>
        </div>
      {galleryItems.map((item, idx) => (
        <section
          key={idx}
          className={`flex flex-col md:flex-row ${item.imageOnLeft ? '' : 'md:flex-row-reverse'} items-center py-8 md:py-16 max-w-5xl mx-auto`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full md:w-[350px] h-[250px] rounded-2xl object-cover mx-0 md:mx-8"
          />
          <div className="flex-1 min-w-[280px] mt-8 md:mt-0">
            <span className="block text-sm font-medium mb-2 text-black">{item.subtitle}</span>
            <h2 className="text-3xl text-black font-semibold mb-3">{item.title}</h2>
            <p className="mb-4 text-black">{item.description}</p>
            <ul className="space-y-2">
              {item.features.map((f, i) => (
                <li key={i} className="gallery-feature text-black">✔ {f}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Gallery;