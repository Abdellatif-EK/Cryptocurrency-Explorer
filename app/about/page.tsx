'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold">
            About Crypto Explorer
          </CardTitle>
          <CardDescription>
            Your gateway to the world of cryptocurrencies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            Crypto Explorer is a cutting-edge platform designed to help users
            navigate the complex world of cryptocurrency market data and trends.
            Our mission is to provide accurate, up-to-date information to
            empower users in their investment decisions.
          </p>
          <p className="text-lg">
            Whether you&apos;re a seasoned investor or just getting started, Crypto
            Explorer offers powerful tools and insights to make informed choices
            in the fast-evolving world of cryptocurrencies.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Real-time Market Data</AccordionTrigger>
              <AccordionContent>
                Stay updated with the latest cryptocurrency prices, market caps,
                and trading volumes. Our platform fetches data from reliable
                sources to ensure you have the most current information at your
                fingertips.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Advanced Charting Tools</AccordionTrigger>
              <AccordionContent>
                Visualize price trends and market movements with our interactive
                charts. Analyze historical data and spot patterns to inform your
                investment strategies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Comprehensive Coin Information
              </AccordionTrigger>
              <AccordionContent>
                Access detailed information about each cryptocurrency, including
                project descriptions, team information, and relevant links to
                official resources and community platforms.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            About the Developer : Abdellatif EL KERBANI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            The app was developed by a passionate software engineer who
            specializes in full-stack development. With a strong foundation in
            React, React Native and Django and SpringBoot, the developer has a
            keen interest in AI, machine learning, and blockchain technology.
          </p>
          <p className="text-lg">
            Having worked on various projects involving web and mobile app
            development, including a plant disease detection system, the
            developer strives to create impactful solutions that blend
            cutting-edge technology with real-world problems.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Spring Boot</Badge>
            <Badge variant="secondary">React Native</Badge>
            <Badge variant="secondary">Django</Badge>
            <Badge variant="secondary">TensorFlow</Badge>
            <Badge variant="secondary">Firebase</Badge>
            <Badge variant="secondary">Machine Learning</Badge>
            <Badge variant="secondary">Blockchain</Badge>
          </div>
          <div className="flex space-x-4 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                window.open('https://github.com/Abdellatif-EK', '_blank')
              }
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                window.open(
                  'https://linkedin.com/in/abdellatif-el-kerbani',
                  '_blank'
                )
              }
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Our Commitment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            At Crypto Explorer, we are committed to providing a reliable,
            secure, and user-friendly platform for all your cryptocurrency
            exploration needs. We continuously update our features and data
            sources to ensure you have the best tools at your disposal.
          </p>
          <Button className="mt-4">Contact Us</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
