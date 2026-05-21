import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoose';
import Item from '@/app/models/Item';
import DailyMenu from '@/app/models/DailyMenu';

function daysAgoISO(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export async function POST() {
  try {
    await connectToDatabase();

    // NOTE: This is dev seed data.
    const userEmail = 'riteshwari';
    const date = daysAgoISO(0);
    const startTime = '09:00'; // Default start time for seeded menu

    const sampleItems = [
      // Food Items (10)
      { type: 'food', name: 'Tomato Chaat', description: 'Fresh tomato chaat with spices', image: '/a1.jpg', price: 50, createdBy: userEmail },
      { type: 'food', name: 'Poha', description: 'Light and healthy poha', image: '/a2.png', price: 30, createdBy: userEmail },
      { type: 'food', name: 'Samosa', description: 'Crispy vegetable samosa', image: '/a1.jpg', price: 20, createdBy: userEmail },
      { type: 'food', name: 'Masala Dosa', description: 'Crispy crepe with potato filling', image: '/a2.png', price: 60, createdBy: userEmail },
      { type: 'food', name: 'Vada Pav', description: 'The classic Mumbai burger', image: '/a1.jpg', price: 25, createdBy: userEmail },
      { type: 'food', name: 'Idli Sambhar', description: 'Steamed rice cakes with lentil soup', image: '/a2.png', price: 40, createdBy: userEmail },
      { type: 'food', name: 'Paneer Wrap', description: 'Spicy paneer in a soft wrap', image: '/a1.jpg', price: 70, createdBy: userEmail },
      { type: 'food', name: 'Veg Biryani', description: 'Fragrant basmati rice with veggies', image: '/a2.png', price: 120, createdBy: userEmail },
      { type: 'food', name: 'Aloo Paratha', description: 'Flatbread stuffed with spiced potatoes', image: '/a1.jpg', price: 45, createdBy: userEmail },
      { type: 'food', name: 'Chole Bhature', description: 'Spicy chickpeas with fried bread', image: '/a2.png', price: 90, createdBy: userEmail },

      // Drink Items (10)
      { type: 'drink', name: 'Fresh Lime Soda', description: 'Refreshing lime soda', image: '/a1.jpg', price: 30, createdBy: userEmail },
      { type: 'drink', name: 'Ginger Lemon Tea', description: 'Warm ginger lemon tea', image: '/a2.png', price: 20, createdBy: userEmail },
      { type: 'drink', name: 'Cold Coffee', description: 'Creamy iced coffee', image: '/a1.jpg', price: 55, createdBy: userEmail },
      { type: 'drink', name: 'Mango Lassi', description: 'Sweet yogurt-based mango drink', image: '/a2.png', price: 50, createdBy: userEmail },
      { type: 'drink', name: 'Masala Chai', description: 'Indian spiced milk tea', image: '/a1.jpg', price: 15, createdBy: userEmail },
      { type: 'drink', name: 'Mint Mojito', description: 'Cooling mint and lime cooler', image: '/a2.png', price: 80, createdBy: userEmail },
      { type: 'drink', name: 'Orange Juice', description: 'Freshly squeezed orange juice', image: '/a1.jpg', price: 60, createdBy: userEmail },
      { type: 'drink', name: 'Badam Milk', description: 'Almond infused warm milk', image: '/a2.png', price: 45, createdBy: userEmail },
      { type: 'drink', name: 'Watermelon Juice', description: 'Fresh watermelon juice', image: '/a1.jpg', price: 50, createdBy: userEmail },
      { type: 'drink', name: 'Buttermilk', description: 'Spiced savory yogurt drink', image: '/a2.png', price: 25, createdBy: userEmail },
    ];

    // Create items if not exist (by name+type)
    const created = [];
    for (const it of sampleItems) {
      const existing = await Item.findOne({ type: it.type, name: it.name });
      if (!existing) {
        const item = await Item.create(it);
        created.push(item);
      } else {
        created.push(existing);
      }
    }

    const foodItems = created.filter((x) => x.type === 'food');
    const drinkItems = created.filter((x) => x.type === 'drink');

    // Build daily menu to show on the main page for 'riteshwari'
    const selectedItems = [
      foodItems[0]?._id,
      foodItems[1]?._id,
      foodItems[2]?._id,
      drinkItems[0]?._id,
      drinkItems[1]?._id,
    ].filter(Boolean);

    const existingDaily = await DailyMenu.findOne({ userEmail, date });
    if (existingDaily) {
      existingDaily.items = selectedItems;
      existingDaily.startTime = startTime; // Update startTime as well
      await existingDaily.save();
    } else {
      await DailyMenu.create({ userEmail, date, startTime, items: selectedItems });
    }

    return NextResponse.json({ message: 'Seeded 20 items + daily menu', userEmail, date, startTime }, { status: 200 });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
