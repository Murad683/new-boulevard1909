interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  light?: boolean;
}

const SectionHeader = ({ subtitle, title, description, light = false }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-16 md:mb-20">
      {subtitle && (
        <span className="text-body-sm text-primary block mb-6">{subtitle}</span>
      )}
      <h2
        className={`text-heading-lg mb-6 ${
          light ? "text-secondary-foreground" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      <div className="gold-separator" />
      {description && (
        <p
          className={`text-body-lg mt-6 max-w-2xl mx-auto ${
            light ? "text-secondary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
