import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, ImageOff } from "lucide-react";
import type { ClientProduct } from "@/lib/product-types";
import { COMPANY } from "@/lib/company";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ClientProduct;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const mainImage = product.images[0];
  const categoryShort = product.category.split(" · ")[0];

  return (
    <article
      className={cn(
        "group rounded-lg border border-border bg-card overflow-hidden flex flex-col transition-shadow hover:shadow-lg hover:shadow-black/20 hover:border-primary/30",
        className,
      )}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <ImageOff className="w-8 h-8 text-muted-foreground/40" />
            <Badge variant="warning" className="text-[10px]">Image needed</Badge>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
            {categoryShort}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-semibold text-sm leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{product.shortDescription}</p>
        </div>

        {product.price && (
          <p className="text-sm font-semibold text-primary">{product.price.display}</p>
        )}

        <div className="mt-auto flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/products/${product.slug}`}>
              View Details
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={COMPANY.telHref}>
              <Phone className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
