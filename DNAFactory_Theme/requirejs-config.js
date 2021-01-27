var config = {
    paths:{
        // bootstrapSlider carousel's implementation
        bootstrapSlider: 'DNAFactory_Theme/js/carousels/bootstrap'
    },
    config: {
        mixins:{
            "DNAFactory_Theme/js/responsive-accordion":{
                "DNAFactory_Theme/js/responsive-accordion-mixin": true
            },
            "DNAFactory_Theme/js/carousels/tiny-slider":{
                "DNAFactory_Theme/js/carousels/tiny-slider-custom-classes-mixin": true
            },
            "DNAFactory_Theme/js/dna-carousel":{
                "DNAFactory_Theme/js/dna-carousel-mixin": true
            }
        }
    }
}