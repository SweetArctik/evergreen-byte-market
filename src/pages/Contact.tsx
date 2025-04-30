
import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import { Mail, MapPin, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="container-custom py-12 pt-24">
      <h1 className="text-3xl font-bold text-forestGreen mb-6">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Have questions about our products or need technical assistance?
                Our team is here to help you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="text-forestGreen mt-1" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Tech Street, Suite 456<br />
                    Silicon Valley, CA 94043
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="text-forestGreen mt-1" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-sm text-muted-foreground">
                    support@techgear.example.com<br />
                    sales@techgear.example.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <User className="text-forestGreen mt-1" />
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-sm text-muted-foreground">
                    (123) 456-7890 (Support)<br />
                    (123) 456-7891 (Sales)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>Fill out this form and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  {...register("name", { required: "Name is required" })}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Order Inquiry" 
                  {...register("subject", { required: "Subject is required" })}
                  className={errors.subject ? "border-destructive" : ""}
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="How can we help you?" 
                  rows={5} 
                  {...register("message", { required: "Message is required" })}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message as string}</p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" form="contact-form" className="w-full">
              Send Message
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
