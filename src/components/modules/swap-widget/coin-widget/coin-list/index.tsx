import React, { useEffect, useState, useMemo, useCallback } from "react";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import CoinListCard from "./CoinListCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTokenStore } from "@/store/token";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface Props {
  coins: any[];
  onClose: (id: number) => void;
}

interface SearchCache {
  [key: string]: Token[];
}

const CoinList = ({ onClose }: Props) => {
  const { tokenList } = useTokenStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokenList);
  const [searchCache, setSearchCache] = useState<SearchCache>({});

  const searchTokens = useMemo(
    () =>
      _.debounce((query: string, tokens: Token[]) => {
        if (query === "") {
          setFilteredTokens(tokens);
          return;
        }

        if (searchCache[query]) {
          setFilteredTokens(searchCache[query]);
          return;
        }

        const searchLower = query.toLowerCase();
        const filtered = tokens.filter(
          (token) =>
            token.name.toLowerCase().includes(searchLower) ||
            token.symbol.toLowerCase().includes(searchLower)
        );

        setSearchCache((prevCache) => ({
          ...prevCache,
          [query]: filtered,
        }));

        setFilteredTokens(filtered);
      }, 300),
    [searchCache]
  );

  useEffect(() => {
    setSearchCache({});
    setFilteredTokens(tokenList);
  }, [tokenList]);

  useEffect(() => {
    searchTokens(searchQuery, tokenList);
    return () => {
      searchTokens.cancel();
    };
  }, [searchQuery, tokenList, searchTokens]);

  const renderSkeletons = useCallback(
    () => (
      <AnimatePresence>
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="flex items-center space-x-4 p-4"
          >
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    ),
    []
  );

  const renderedTokenList = useMemo(
    () => (
      <AnimatePresence mode="sync">
        {filteredTokens.map((token, index) => (
          <motion.div
            key={`${token.symbol}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <CoinListCard
              token={token}
              className="hover:bg-white/15 transition-colors cursor-pointer"
              onClick={() => onClose(index)}
            />
          </motion.div>
        ))}
        {filteredTokens.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-4 text-muted"
          >
            {`No tokens found matching "{${searchQuery}}"`}
          </motion.div>
        )}
      </AnimatePresence>
    ),
    [filteredTokens, searchQuery, onClose]
  );

  return (
    <DrawerContent>
      <DrawerHeader className="relative">
        <DrawerTitle hidden>Select Coin</DrawerTitle>
        <Search size={14} className="absolute left-6 top-1/2 transform -translate-y-1/2 text-primary" />
        <Input
          type="text"
          placeholder="Search by name, symbol, or address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </DrawerHeader>
      <motion.div
        layout
        className="space-y-2 p-4 overflow-y-scroll"
        transition={{delay: 0.2}}
      >
        {tokenList.length === 0 ? renderSkeletons() : renderedTokenList}
      </motion.div>
      <DrawerFooter className="text-xs">
        Fetched From Panora
      </DrawerFooter>
    </DrawerContent>
  );
};

export default CoinList;
