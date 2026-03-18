import express from 'express';

const router = express.Router();

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    specialization: 'Clinical Psychologist',
    phone: '+1 (555) 234-5678',
    email: 'dr.mitchell@mentalhealth.com',
    address: '123 Wellness Blvd, Suite 200',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. James Rodriguez',
    specialization: 'Psychiatrist',
    phone: '+1 (555) 345-6789',
    email: 'dr.rodriguez@mindcare.com',
    address: '456 Serenity Lane, Suite 100',
    available: true,
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialization: 'Cognitive Behavioral Therapist',
    phone: '+1 (555) 456-7890',
    email: 'dr.chen@cbttherapy.com',
    address: '789 Harmony Ave, Suite 300',
    available: true,
  },
  {
    id: 4,
    name: 'Dr. Michael Patel',
    specialization: 'Neuropsychiatrist',
    phone: '+1 (555) 567-8901',
    email: 'dr.patel@neurowell.com',
    address: '321 Tranquil Road, Suite 150',
    available: false,
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialization: 'Trauma Specialist',
    phone: '+1 (555) 678-9012',
    email: 'dr.thompson@healingpath.com',
    address: '654 Peace Street, Suite 250',
    available: true,
  },
];

router.get('/', (req, res) => {
  res.json(doctors);
});

router.get('/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  res.json(doctor);
});

export default router;
