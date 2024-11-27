import { BookOpen, Headphones, Music } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

const Categories = () => {
  return (
    <section className="py-16 my-10 bg-muted">
      <div className="md:max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2" />
                Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Dive into a world of imagination with our extensive collection
                of physical books.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/type/0">
                <Button variant="outline" className="w-full">
                  Browse Books
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Headphones className="mr-2" />
                eBooks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Enjoy the convenience of digital reading with our wide range of
                eBooks.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/type/1">
                <Button variant="outline" className="w-full">
                  Explore eBooks
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Music className="mr-2" />
                Music
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Discover new tunes and revisit classics with our curated music
                selection.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/type/2">
                <Button variant="outline" className="w-full">
                  Find Music
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Categories;
