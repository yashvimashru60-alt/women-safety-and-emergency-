import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Phone, User, Trash2, Star, StarOff } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useContacts } from '@/contexts/ContactsContext';
import { toast } from '@/hooks/use-toast';

const Contacts = () => {
  const { isAuthenticated } = useAuth();
  const { contacts, addContact, removeContact, toggleEmergency } = useContacts();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: 'Friend',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[+]?[\\d\\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addContact({
      name: formData.name,
      phone: formData.phone,
      relationship: formData.relationship,
      isEmergency: false,
    });

    setFormData({ name: '', phone: '', relationship: 'Friend' });
    setShowForm(false);
  };

  const handleCall = (phone: string, name: string) => {
    toast({
      title: `Calling ${name}...`,
      description: `Dialing ${phone}`,
    });
    window.open(`tel:${phone.replace(/\s/g, '')}`);
  };

  if (!isAuthenticated) return null;

  const emergencyContacts = contacts.filter(c => c.isEmergency);
  const otherContacts = contacts.filter(c => !c.isEmergency);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Trusted <span className="text-gradient">Contacts</span>
              </h1>
              <p className="text-muted-foreground">Manage your safety network</p>
            </div>
            <GradientButton onClick={() => setShowForm(!showForm)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Contact
            </GradientButton>
          </motion.div>

          {/* Add Contact Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <GlassCard variant="elevated">
                <h3 className="text-xl font-display font-bold mb-4">Add New Contact</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Contact name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="pl-10 bg-muted/50 border-border"
                        />
                      </div>
                      {errors.name && <p className="text-sm text-urgent">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-10 bg-muted/50 border-border"
                        />
                      </div>
                      {errors.phone && <p className="text-sm text-urgent">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Select
                      value={formData.relationship}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, relationship: value }))}
                    >
                      <SelectTrigger className="bg-muted/50 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Sibling">Sibling</SelectItem>
                        <SelectItem value="Spouse">Spouse</SelectItem>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Colleague">Colleague</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3">
                    <GradientButton type="submit">
                      Save Contact
                    </GradientButton>
                    <GradientButton 
                      variant="ghost" 
                      type="button"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </GradientButton>
                  </div>
                </form>
              </GlassCard>
            </motion.div>
          )}

          {/* Emergency Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-urgent" />
              Emergency Contacts ({emergencyContacts.length})
            </h2>
            
            {emergencyContacts.length === 0 ? (
              <GlassCard className="text-center py-8">
                <p className="text-muted-foreground">
                  No emergency contacts yet. Star your most trusted contacts for quick SOS alerts.
                </p>
              </GlassCard>
            ) : (
              <div className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onCall={handleCall}
                    onToggleEmergency={toggleEmergency}
                    onRemove={removeContact}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Other Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-display font-bold mb-4">
              Other Contacts ({otherContacts.length})
            </h2>
            
            {otherContacts.length === 0 ? (
              <GlassCard className="text-center py-8">
                <p className="text-muted-foreground">
                  Add more contacts to build your safety network.
                </p>
              </GlassCard>
            ) : (
              <div className="space-y-3">
                {otherContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onCall={handleCall}
                    onToggleEmergency={toggleEmergency}
                    onRemove={removeContact}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface ContactCardProps {
  contact: { id: string; name: string; phone: string; relationship: string; isEmergency: boolean };
  onCall: (phone: string, name: string) => void;
  onToggleEmergency: (id: string) => void;
  onRemove: (id: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onCall, onToggleEmergency, onRemove }) => {
  return (
    <GlassCard>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            contact.isEmergency ? 'gradient-emergency' : 'gradient-button'
          }`}>
            <span className="text-lg font-bold text-background">
              {contact.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              {contact.name}
              {contact.isEmergency && <Star className="w-4 h-4 text-urgent fill-urgent" />}
            </h3>
            <p className="text-muted-foreground text-sm">{contact.phone}</p>
            <p className="text-muted-foreground text-xs">{contact.relationship}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleEmergency(contact.id)}
            className={`p-2 rounded-lg transition-colors ${
              contact.isEmergency 
                ? 'text-urgent hover:bg-urgent/10' 
                : 'text-muted-foreground hover:bg-muted/50'
            }`}
            title={contact.isEmergency ? 'Remove from emergency' : 'Add to emergency'}
          >
            {contact.isEmergency ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
          </button>
          <button
            onClick={() => onCall(contact.phone, contact.name)}
            className="p-2 rounded-lg text-accent hover:bg-accent/10 transition-colors"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={() => onRemove(contact.id)}
            className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default Contacts;
